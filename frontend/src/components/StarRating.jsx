import React from "react";

export default function StarRating({ percent }) {
  return (
    <div className="relative">
      <div className="flex h-10">
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#6a7282"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#6a7282"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#6a7282"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#6a7282"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#6a7282"
          />
        </svg>
      </div>
      <div
        className="absolute flex h-10 top-0 left-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#ffba00"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#ffba00"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#ffba00"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#ffba00"
          />
        </svg>
        <svg viewBox="0 0 960 960" width="24" height="24">
          <path
            d="M480 113L612 385H900L674 558L733 840L480 691L227 840L286 558L60 385H348Z"
            fill="#ffba00"
          />
        </svg>
      </div>
    </div>
  );
}
