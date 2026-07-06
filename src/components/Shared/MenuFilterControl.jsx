"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ClockIcon,
  DocumentTextIcon,
  FilterIcon,
  FolderIcon,
  GridIcon,
} from "@/components/Shared/Icons";

const iconByName = {
  arrowDown: ArrowDownIcon,
  arrowUp: ArrowUpIcon,
  clock: ClockIcon,
  document: DocumentTextIcon,
  filter: FilterIcon,
  folder: FolderIcon,
  grid: GridIcon,
  sort: ArrowUpDownIcon,
};

const buildQuery = (query, paramName, value) => {
  const nextQuery = { ...query, [paramName]: value };

  Object.keys(nextQuery).forEach((key) => {
    if (nextQuery[key] === undefined || nextQuery[key] === null || nextQuery[key] === "") {
      delete nextQuery[key];
    }
  });

  return nextQuery;
};

const MenuFilterControl = ({
  activeValue,
  ariaLabel,
  basePath,
  className = "",
  options,
  paramName,
  query = {},
  triggerIcon = "filter",
  triggerLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuId = useId();
  const activeOption =
    options.find(({ value }) => value === activeValue) || options[0];
  const TriggerIcon = iconByName[triggerIcon] || FilterIcon;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav
      aria-label={ariaLabel}
      className={`relative z-30 flex items-center justify-end ${className}`}
    >
      <div ref={containerRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          aria-label={`${triggerLabel}: ${activeOption.label}`}
          aria-expanded={isOpen}
          aria-controls={menuId}
          className={`flex h-10 w-10 items-center justify-center rounded-md text-dark/80 transition-colors duration-200 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-light/80 dark:hover:text-primaryDark dark:focus-visible:outline-primaryDark ${
            isOpen ? "text-primary dark:text-primaryDark" : ""
          }`}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          <TriggerIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        </button>

        {isOpen && (
          <div
            id={menuId}
            className="absolute right-0 top-full z-50 mt-3 w-64 max-w-[calc(100vw-2rem)] rounded-xl border border-solid border-dark/10 bg-light/95 p-1.5 shadow-[0_24px_70px_rgba(15,23,42,0.18)] ring-1 ring-dark/[0.03] backdrop-blur dark:border-light/15 dark:bg-dark/95 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] dark:ring-light/[0.05]"
          >
            <ul className="space-y-1">
              {options.map(({ value, label, icon }) => {
                const isActive = activeValue === value;
                const OptionIcon = iconByName[icon] || FilterIcon;

                return (
                  <li key={value}>
                    <Link
                      href={{
                        pathname: basePath,
                        query: buildQuery(query, paramName, value),
                      }}
                      scroll={false}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors duration-200 focus-visible:bg-dark/[0.06] dark:focus-visible:bg-light/[0.08] ${
                        isActive
                          ? "bg-dark/[0.04] text-dark dark:bg-light/[0.07] dark:text-light"
                          : "text-dark/75 hover:bg-dark/[0.04] hover:text-dark dark:text-light/75 dark:hover:bg-light/[0.07] dark:hover:text-light"
                      }`}
                    >
                      <OptionIcon
                        className={`h-4 w-4 shrink-0 ${
                          isActive
                            ? "text-primary dark:text-primaryDark"
                            : "text-dark/65 dark:text-light/65"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="flex-1 truncate">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MenuFilterControl;
