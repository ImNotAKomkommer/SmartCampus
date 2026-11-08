const test = require("node:test");
const assert = require("node:assert/strict");
const { checkAvailability } = require("../.test-build/availability.js");
const { filterRooms } = require("../.test-build/roomFilters.js");
const { chooseRoomId } = require("../.test-build/roomSelection.js");
const { getRoomAvailabilityView } = require("../.test-build/availabilityView.js");
const { rooms } = require("../.test-build/roomData.js");
const { bookings } = require("../.test-build/bookingData.js");
const existing = { id:"x", roomId:"r1", start:600, end:660, title:"Existing", owner:"Tutor" };
const simpleRoom = { id:"r1", name:"Room", capacity:40, equipment:["Projector","Whiteboard"], blocked:false };
function decision(start,end,now=540,blocked=false, records=[existing]) {
 return checkAvailability({...simpleRoom,blocked},records,start,end,now).status;
}
const cases = [
 ["AC1 start now rejected",540,570,"unavailable"],
 ["AC1 zero duration rejected",720,720,"unavailable"],
 ["AC1 reversed rejected",750,720,"unavailable"],
 ["AC1 out of day rejected",1380,1441,"unavailable"],
 ["AC1 negative start rejected",-1,40,"unavailable"],
 ["AC2 120 minutes allowed",720,840,"available"],
 ["AC2 121 minutes rejected",720,841,"unavailable"],
 ["AC4 touching after is allowed",660,720,"available"],
 ["AC4 touching before is allowed",570,600,"available"],
 ["AC4 partial overlap rejected",630,690,"unavailable"],
 ["AC4 containing interval rejected",570,690,"unavailable"],
 ["AC4 inside interval rejected",615,645,"unavailable"],
 ["AC4 identical interval rejected",600,660,"unavailable"],
];
for (const [label,start,end,expected] of cases) test(label,()=>assert.equal(decision(start,end),expected));
test("AC3 blocked room rejected",()=>assert.equal(decision(660,720,540,true),"unavailable"));
test("AC4 other room booking must not conflict",()=>assert.equal(decision(600,660,540,false,[{...existing,roomId:"r2"}]),"available"));
test("AC1 at exactly 1440 is valid",()=>assert.equal(decision(1439,1440),"available"));
test("AC5 source bookings never mutated",()=>{let data=structuredClone(bookings);let before=structuredClone(data);checkAvailability(rooms[0],data,750,810,540);assert.deepEqual(data,before);});
test("F1 exact capacity included",()=>assert.equal(filterRooms(rooms,{attendees:40,equipment:[]}).some(r=>r.id==="r1"),true));
test("F1 insufficient capacity excluded",()=>assert.equal(filterRooms(rooms,{attendees:41,equipment:[]}).some(r=>r.id==="r1"),false));
test("F1 invalid attendee count returns empty",()=>assert.equal(filterRooms(rooms,{attendees:0,equipment:[]}).length,0));
test("F2 all required equipment must exist",()=>{let matches=filterRooms(rooms,{attendees:20,equipment:["Projector","Computers"]}); assert.deepEqual(matches.map(r=>r.id),["r1","r3"]);});
test("F2 one missing required item excludes room",()=>assert.equal(filterRooms(rooms,{attendees:20,equipment:["Video conferencing","Computers"]}).some(r=>r.id==="r2"),false));
test("F3 blocked room cannot be available",()=>assert.equal(checkAvailability(rooms[2],bookings,660,720,540).status,"unavailable"));
test("F4 no matches returns empty list and null selection",()=>{let matches=filterRooms(rooms,{attendees:61,equipment:[]});assert.deepEqual(matches,[]);assert.equal(chooseRoomId(matches,"r1"),null);});
test("F5 preserves eligible current selection",()=>assert.equal(chooseRoomId(rooms,"r2"),"r2"));
test("F5 chooses valid fallback if removed by filter",()=>{let matches=filterRooms(rooms,{attendees:30,equipment:[]});assert.equal(chooseRoomId(matches,"r2"),"r1");});
test("INTEGRATION UI view switches chosen room and its bookings/result",()=>{
  let first=getRoomAvailabilityView(rooms,bookings,"r1",600,660,540);
  let second=getRoomAvailabilityView(rooms,bookings,"r2",600,660,540);
  assert.equal(first.room?.name,"Athena 101");assert.equal(second.room?.name,"Curie 204");
  assert.deepEqual(first.roomBookings.map(x=>x.id),["b1","b2","b3"]);
  assert.deepEqual(second.roomBookings.map(x=>x.id),["b4","b5"]);
  assert.equal(first.result?.status,"available");assert.equal(second.result?.status,"unavailable");
});
test("INTEGRATION empty matching list clears stale room result",()=>{
 let view=getRoomAvailabilityView([],bookings,null,660,720,540);
 assert.equal(view.room,null);assert.equal(view.result,null);assert.deepEqual(view.roomBookings,[]);
});
