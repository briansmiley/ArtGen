import { useRef } from "react";
/**
 * Returns {handleTouchMove, handleTouchEnd}; handleTouchMove should be attached to the
 * onTouchMove event of the element to track drags, and handleTouchEnd should be
 * attached to onTouchEnd and given the callback to run in the event of a non-drag tap
 *
 * example:
 *
 * const { handleTouchMove, handleTouchEnd } = useTap();
 * const tapCallback = () => console.log("tapped");
 * <div
 *   onTouchMove={handleTouchMove}
 *   onTouchEnd={handleTouchEnd(tapCallback)}
 * >
 *   This div will log "tapped" only when tapped and not dragged
 *
 * </div>
 */
const useTap = () => {
  const draggingRef = useRef(false);
  /**Create a callback to attach to touchmove */
  const handleTouchMove = () => {
    draggingRef.current = true;
  };
  /**Creates a callback to run if the touch ends and wasnt a drag */
  const handleTouchEnd = (callback: () => void) => () => {
    if (!draggingRef.current) callback();
    draggingRef.current = false;
  };
  return { handleTouchMove, handleTouchEnd };
};

export default useTap;
