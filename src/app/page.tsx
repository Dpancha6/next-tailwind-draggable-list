"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DragStart, DragUpdate } from "@hello-pangea/dnd";
import { Card, CardContent } from "./components/ui/card";

const initialItems = [
  { id: '1', title: 'Scotland Island', location: 'Sydney, Australia', image: './Scotland_Island.jpg' },
  { id: '2', title: 'The Charles Grande Brasserie & Bar', location: 'Lorem ipsum, Dolor', image: './the-charles-grand-brasserie-and-bar.jpg' },
  { id: '3', title: 'Bridge Climb', location: 'Dolor, sit amet', image: './the-bridgeclimb.jpg' },
  { id: '4', title: 'Manly Beach', location: 'Sydney, Australia', image: './Scotland-island.webp' },
  { id: '5', title: 'Clam Bar', location: 'Et cetera veni, Vidi vici', image: './Clam_Bar.webp' },
  { id: '6', title: 'Vivid Festival', location: 'Sydney, Australia', image: './Vivid_Festival.png' },
];

export default function Home() {
  const [items, setItems] = useState(initialItems);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setItems(reorderedItems);

    setDraggedItemIndex(null);
    setIsDragging(false);
  };

  const onDragStart = (result: DragStart) => {
    // console.log(result);
    setDraggedItemIndex(result.source.index);
    setIsDragging(true);
  };

  const onDragUpdate = (update: DragUpdate) => {
    if (update.destination) {
      setHoveredIndex(update.destination.index);
    } else {
      setHoveredIndex(null);
    }
  };

  return (
    <main className="flex pt-20 pb-20 justify-center items-center min-h-100vh bg-gray-100 Arial">

      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="">
              {items.map(({ id, title, location, image }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => {
                    const { transform, ...draggableStyle } = provided.draggableProps.style || {};
                    return (
                      <>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...draggableStyle,
                            opacity: draggedItemIndex === index && snapshot.isDragging ? 0.5 : 1,
                            position: draggedItemIndex === index && snapshot.isDragging ? 'static' : 'sticky',
                            transform: draggedItemIndex === index && snapshot.isDragging ? "" : 'none',
                            borderBottom: hoveredIndex === index && isDragging ? '3px solid #3ea4f0' : 'none',

                          }}
                          className={`flex items-center ${snapshot.draggingOver ? 'rounded-lg' : ''}`}
                        >
                          <Card>
                            <CardContent>
                              <div className={`flex items-center ${snapshot.draggingOver ? 'rounded-lg' : ''}`}>
                                <img
                                  src={image}
                                  alt={title}
                                  className="w-14 h-14 rounded-xl object-cover mr-4"
                                />
                                <div>
                                  <h6 className="text-sm"  style={{ fontWeight: '600' }}>{title}</h6>
                                  {/* <p className="text-xs text-gray-600">{location}</p> */}
                                  <div className="flex items-center text-xs text-gray-600">
                                    <img src='location.svg' alt="Location icon" className="w-4 h-4 mr-1" />
                                    <p>{location}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        {snapshot.isDragging && draggedItemIndex === index && (
                        <div
                          {...provided.draggableProps}
                            className="fixed pointer-events-none "
                            style={{ zIndex: 999, marginTop: '-80px', marginLeft: '30px',
                              transform: provided.draggableProps.style?.transform,
                            }}
                          >
                            <div className="p-2 bg-white w-56 border border-yellow-400 border-4 opacity-100 flex items-center">
                              <img
                                src={image}
                                alt={title}
                                className="ml-2 w-7 h-7 rounded object-cover mr-3"
                              />
                              <div>
                                <h6 className="text-xs font-bold">{title}</h6>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
