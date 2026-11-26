# UI editing recipes

Use this guide for a product demo that moves from an interaction to a changed UI state. Choose a recipe by what the viewer needs to see.

## Make the result visible in the storyboard

| Beat | Specify in the shot |
|---|---|
| Setup | Show the input, constraint, or previous state that makes the action matter. |
| Action | Give the viewer one clear target. Tag its tap frame and the element that will carry attention across the cut. |
| Proof | Show the changed item, generated output, or resolved status in context. Keep the relevant input or item recognizable in the result. |
| Hold | Let the viewer read the smallest important detail. Use a stable focal area and restrained secondary motion during the hold. |

Choose the composition for the proof before tuning effects. A prompt can become a resolved item, a status pill can become a checklist, or one card can separate into individually selectable layers. A short motion test can isolate a click and a cut. For a 10–15 second ad, fit the setup, action and proof into three or four readable beats, with a distinct focal object, camera scale, or layout change at the major beats. [Storyboard planning](storyboard-segments.md)

## Mask a cut with a two-part slide

Use [maskedSlidePose](../../templates/motion_primitives.ts) for two scenes that should feel like one movement in the same direction. The outgoing scene accelerates into the cut. The incoming scene decelerates to a stop. Blur and exposure peak on the exact switch frame, then return to neutral. The opacity dip helps cover the change in scene position at the seam.

| Control | Default at 60 FPS and 1080-wide composition |
|---|---|
| Total duration | 24 frames, 12 on either side of the cut |
| Travel | x = 0 px and y = 240 px, upward slide across the seam |
| Peak | 32 px blur, brightness 1.40 and foreground opacity 0.28 |
| Rest | Translation and blur zero, brightness and opacity 1 |

Set duration in seconds on the storyboard, then convert once to the composition FPS. A 400 ms effect uses 12 frames at 30 FPS or 24 at 60 FPS. For a horizontal slide, set travelY to zero and choose travelX. The sign controls the direction. For narrower compositions, scale the travel and blur to the visual size. Treat defaults as a starting point based on the test, and choose the light and direction that fit the shot. [Day 2 reference](https://www.tiktok.com/@olaf.motion/video/7710531264477990176)

Put the active scene and UI in one clipped, overscanned viewport above a continuous backdrop. Use scene to switch at the cut and apply x, y, blurPx, brightness and opacity to the active foreground. Use effect only if a separate light wash helps cover the seam. For an interaction that updates one item in place, keep the existing composition and animate the item through the state change.

## Give the click a physical contact point

Use evalCursorPos for the curved approach and [cursorContactPose](../../templates/motion_primitives.ts) when the cursor and its target should compress together. Keep the final waypoint at the hotspot, on the click frame. Apply both scales around that hotspot. When the camera moves, transform both in the same coordinate space. Trigger the click SFX from the same frame. For this recipe, use the paired pose as the sole scale driver on both elements. If the target needs extra emphasis, add a clickRipple from the shared cue.

At 60 FPS the default contact compresses over six frames to cursor scale 0.75 and target scale 0.90, then releases over 12 frames. The pivot stays fixed while the cursor rotates slightly. Set pressFrames and releaseFrames independently for the gesture's weight. A click and a drag can keep different timing. [Day 5 reference](https://www.tiktok.com/@olaf.motion/video/7712108535349284129)

~~~tsx
const frame = useCurrentFrame();
const {fps} = useVideoConfig();
const clickFrame = Math.round(2.2 * fps);
const cutFrame = Math.round(2.6 * fps);
const hotspot = {x: 870, y: 1130};

const tip = evalCursorPos(frame, [
  {frame: Math.round(1.35 * fps), x: 985, y: 1400},
  {frame: clickFrame, ...hotspot, arc: 90},
]);
const contact = cursorContactPose(frame, clickFrame, {
  pressFrames: Math.max(1, Math.round(0.10 * fps)),
  releaseFrames: Math.max(1, Math.round(0.20 * fps)),
});
const slide = maskedSlidePose(frame, cutFrame, {
  durationFrames: Math.round(0.40 * fps),
});
~~~

Use tip.x and tip.y for the pointer anchor. Add contact.cursorRotation to tip.tilt, then apply contact.cursorScale around the pointer tip. The button uses contact.targetScale around the target's local hotspot. Slide only the foreground at the cut and keep captions or overlays clear of the blur where they need to remain readable.

## Match style and pace to the information

- **Status proof.** Carry the same name or icon from failure through pending to resolved. Change semantic color and replace a cropped status with readable detail. [GitHub reference](https://www.tiktok.com/@olaf.motion/video/7702517238280080673)
- **Layer proof.** Keep the silhouette of a card visible as it tilts and separates. Settle on the layer list and the corresponding selected part. [Screenshot-to-vector reference](https://www.tiktok.com/@olaf.motion/video/7706831612893351200)
- **Reading beat.** Slow down prompt entry and technical output. Spend the fast movement on the setup-to-result change. Measure the reading hold and transition by phase. [Notion reference](https://www.tiktok.com/@olaf.motion/video/7706204438955904288) · [Mintlify reference](https://www.tiktok.com/@olaf.motion/video/7703493039209139488)
- **Graphic bridge.** Use one repeated shape or type treatment to connect shots across a palette change. Establish the text hierarchy and confirm the accent background can support it. [ElevenLabs reference](https://www.tiktok.com/@olaf.motion/video/7701642440779812129) · [Pacing choreography](pacing-choreography.md)

## Verify the edit

1. Inspect the frame before contact, the contact frame, peak compression, and release. Check the cursor tip, target reaction and SFX timing against the shared cue.
2. Inspect the frame before the cut, the switch frame, and the settled incoming frame. Play the window at speed to check that movement direction reads continuously and the seam stays covered.
3. Play the proof beat at viewing size. Confirm the actual UI change is readable with the same item or input identifiable. Measure the result hold and the faster action separately, then audit the full cut.
