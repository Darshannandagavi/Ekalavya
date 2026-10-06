import React, { useEffect, useMemo, useState } from "react";

const PeekRating = ({
  defaultValue = 0,
  count = 5,
  shape = "star",
  labels = [],
  activeColor = "#f5b400",
  idleColor = "#52525b",
  tipColor = "#27272a",
  tipTextColor = "#f5f5f5",
  size = 40,
  lift = 8,
  magnify = 1.15,
  riseDuration = 320,
  popScale = 1.3,
  showTip = true,
  allowClear = true,
  onChange,
  showLabels = false,
  readOnly = false,
}) => {
  const [value, setValue] = useState(
    Math.max(0, Math.min(count, Number(defaultValue) || 0)),
  );

  const [hoverValue, setHoverValue] = useState(0);
  const [pressedValue, setPressedValue] = useState(0);

  useEffect(() => {
    setValue(Math.max(0, Math.min(count, Number(defaultValue) || 0)));
  }, [defaultValue, count]);

  const activeValue = hoverValue || value;

  const currentLabel = useMemo(() => {
    if (!activeValue || !labels.length) return "";
    return labels[activeValue - 1] || "";
  }, [activeValue, labels]);

  const getIcon = () => {
    if (shape === "heart") return "♥";
    if (shape === "circle") return "●";
    return "★";
  };

  const handleClick = (rating) => {
    if (readOnly) return;

    let nextValue = rating;

    // Clicking the currently selected rating again clears it.
    if (allowClear && value === rating) {
      nextValue = 0;
    }

    setValue(nextValue);
    setPressedValue(rating);

    if (onChange) {
      onChange(nextValue);
    }

    setTimeout(() => {
      setPressedValue(0);
    }, riseDuration);
  };

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: showLabels ? "8px" : "5px",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: Math.max(4, size * 0.08),
        }}
        onMouseLeave={() => {
          if (!readOnly) {
            setHoverValue(0);
          }
        }}
      >
        {Array.from({ length: count }, (_, index) => {
          const rating = index + 1;
          const isActive = rating <= activeValue;
          const isPressed = rating === pressedValue;

          return (
            <div
              key={rating}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                aria-label={
                  labels[rating - 1]
                    ? `${rating} stars - ${labels[rating - 1]}`
                    : `${rating} stars`
                }
                disabled={readOnly}
                onMouseEnter={() => {
                  if (!readOnly) {
                    setHoverValue(rating);
                  }
                }}
                onFocus={() => {
                  if (!readOnly) {
                    setHoverValue(rating);
                  }
                }}
                onBlur={() => {
                  if (!readOnly) {
                    setHoverValue(0);
                  }
                }}
                onClick={() => handleClick(rating)}
                style={{
                  width: size,
                  height: size,
                  padding: 0,
                  margin: 0,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: isActive ? activeColor : idleColor,
                  fontSize: size * 0.82,
                  lineHeight: 1,
                  cursor: readOnly ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  transform: isPressed
                    ? `translateY(-${lift}px) scale(${popScale})`
                    : isActive && hoverValue
                      ? `translateY(-${lift / 2}px) scale(${magnify})`
                      : "translateY(0) scale(1)",

                  transition: `
                    transform ${riseDuration}ms cubic-bezier(.2,.8,.2,1),
                    color 180ms ease
                  `,

                  filter: isActive
                    ? `drop-shadow(0 3px 7px ${activeColor}55)`
                    : "none",
                }}
              >
                {getIcon()}
              </button>

              {showTip &&
                hoverValue === rating &&
                !readOnly &&
                currentLabel && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: `calc(100% + ${lift + 6}px)`,
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "6px 9px",
                      borderRadius: 7,
                      background: tipColor,
                      color: tipTextColor,
                      fontSize: 11,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      zIndex: 10,
                      boxShadow: "0 5px 18px rgba(0,0,0,.25)",
                      animation: `peekRatingTipIn ${Math.min(
                        riseDuration,
                        220,
                      )}ms ease-out`,
                    }}
                  >
                    {currentLabel}

                    <span
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: -4,
                        width: 8,
                        height: 8,
                        background: tipColor,
                        transform: "translateX(-50%) rotate(45deg)",
                      }}
                    />
                  </div>
                )}
            </div>
          );
        })}
      </div>

      {showLabels && currentLabel && (
        <div
          style={{
            minHeight: 17,
            color: activeColor,
            fontSize: 12,
            fontWeight: 700,
            textAlign: "center",
            transition: "opacity 180ms ease",
          }}
        >
          {currentLabel}
        </div>
      )}

      <style>
        {`
          @keyframes peekRatingTipIn {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(5px) scale(.95);
            }

            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0) scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .peek-rating-motion {
              transition: none !important;
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PeekRating;
