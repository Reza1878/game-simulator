import React, { useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import SimulatorPickSlot from "./SimulatorPickSlot";

function SimulatorPickSlotDND({
  heroes = null,
  active = false,
  timer = 0,
  onDropHero = (hero) => {},
  fullWidth = false,
  droppable = false,
}) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "hero",
    drop: (item) => onDropHero(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ opacity, isDragging }, dragRef] = useDrag(
    {
      type: "droppedHero",
      item: heroes,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    },
    [heroes]
  );

  const defaultProps = useMemo(() => {
    return {
      fullWidth,
      timer,
      active,
      heroes,
    };
  }, [fullWidth, timer, active, heroes]);

  if (droppable) {
    return (
      <div ref={dropRef}>
        <SimulatorPickSlot {...defaultProps} />
      </div>
    );
  }
  return (
    <div ref={dragRef} className="bg-primary">
      <SimulatorPickSlot {...defaultProps} />
    </div>
  );
}

export default SimulatorPickSlotDND;
