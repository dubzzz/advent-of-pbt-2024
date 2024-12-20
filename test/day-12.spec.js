// @ts-check
import { test, fc } from "@fast-check/vitest";
import planFastTravel from "../src/advent-day-12.mjs";
import { expect } from "vitest";

const locationArb = fc.stringMatching(/^[a-z]$/); // small names to make them more likely to collide
const chunkArb = fc.record({
  to: locationArb,
  distance: fc.integer({ min: 1, max: 2 ** 31 - 1 }),
});
const trackArb = fc.record({
  from: locationArb,
  to: locationArb,
  distance: fc.integer({ min: 1, max: 2 ** 31 - 1 }),
});

const inputsArb = fc
  .tuple(
    locationArb,
    fc.array(chunkArb, { size: "+1" }), // increased size to increase complexity of the map
    fc.array(trackArb, { size: "+1" }) // increased size to increase complexity of the map
  )
  .chain(([departure, knownRoute, otherTracks]) => {
    return fc.record({
      knownRouteDistance: fc.constant(
        knownRoute.reduce((acc, item) => acc + item.distance, 0)
      ),
      departure: fc.constant(departure),
      destination: fc.constant(knownRoute.at(-1)?.to ?? departure),
      tracks: fc.shuffledSubarray(
        [
          ...knownRoute.map((c, index) => ({
            ...c,
            from: knownRoute[index - 1]?.to ?? departure,
          })),
          ...otherTracks,
        ],
        { minLength: knownRoute.length + otherTracks.length }
      ),
    });
  });

test.prop([inputsArb])(
  "day #12: take the optimal path in terms of distance between departure and destination",
  ({ knownRouteDistance, departure, destination, tracks }) => {
    const bestRoute = planFastTravel(departure, destination, tracks);
    expect(bestRoute).toBeDefined();
    const bestRouteDistance = bestRoute.reduce(
      (acc, item) => acc + item.distance,
      0
    );
    expect(bestRouteDistance).toBeLessThanOrEqual(knownRouteDistance);
  }
);

test.prop([inputsArb])(
  "day #12: take only existing tracks",
  ({ departure, destination, tracks }) => {
    const bestRoute = planFastTravel(departure, destination, tracks);
    for (const track of bestRoute) {
      expect(tracks).toContainEqual(track);
    }
  }
);

test.prop([inputsArb])(
  "day #12: go from departure to destination",
  ({ departure, destination, tracks }) => {
    const bestRoute = planFastTravel(departure, destination, tracks);
    if (bestRoute.length === 0) {
      expect(departure).toBe(destination);
    } else {
      let currentPlace = departure;
      for (const track of bestRoute) {
        expect(track.from).toEqual(currentPlace);
        currentPlace = track.to;
      }
      expect(bestRoute.at(-1).to).toBe(destination);
    }
  }
);
