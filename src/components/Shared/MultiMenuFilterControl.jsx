"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { FilterIcon, GridIcon, TagIcon } from "@/components/Shared/Icons";
import { triggerCanaryAction } from "@/lib/canary/canaryActions";

const iconByName = {
  filter: FilterIcon,
  grid: GridIcon,
  tag: TagIcon,
};

const buildQuery = (query, paramName, values) => {
  const nextQuery = { ...query };

  if (values.length) {
    nextQuery[paramName] = values.join(",");
  } else {
    delete nextQuery[paramName];
  }

  Object.keys(nextQuery).forEach((key) => {
    if (nextQuery[key] === undefined || nextQuery[key] === null || nextQuery[key] === "") {
      delete nextQuery[key];
    }
  });

  return nextQuery;
};

const toggleValue = (values, value) => {
  return values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];
};

const notifyFilterInspect = (message) => {
  triggerCanaryAction({
    intent: "filterInspect",
    message,
    trigger: "onHover",
  });
};

const MultiMenuFilterControl = ({
  activeValues = [],
  allLabel = "Todas",
  ariaLabel,
  basePath,
  className = "",
  options,
  paramName,
  query = {},
  triggerIcon = "filter",
  triggerLabel,
  unitLabel = "seleccionadas",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuId = useId();
  const activeValueSet = new Set(activeValues);
  const hasActiveValues = activeValues.length > 0;
  const activeSummary = hasActiveValues
    ? `${activeValues.length} ${unitLabel}`
    : allLabel;
  const TriggerIcon = iconByName[triggerIcon] || FilterIcon;
  const triggerMessage = `${triggerLabel}: ${activeSummary}`;

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
          aria-label={`${triggerLabel}: ${activeSummary}`}
          aria-expanded={isOpen}
          aria-controls={menuId}
          data-canary-click-intent="filterApply"
          data-canary-hold="filter"
          data-canary-message={triggerMessage}
          className={`flex h-10 w-10 items-center justify-center rounded-md text-dark/80 transition-colors duration-200 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-light/80 dark:hover:text-primaryDark dark:focus-visible:outline-primaryDark ${
            isOpen || hasActiveValues ? "text-primary dark:text-primaryDark" : ""
          }`}
          onFocus={() => notifyFilterInspect(triggerMessage)}
          onPointerEnter={() => notifyFilterInspect(triggerMessage)}
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
              <li>
                <Link
                  href={{
                    pathname: basePath,
                    query: buildQuery(query, paramName, []),
                  }}
                  scroll={false}
                  aria-current={!hasActiveValues ? "page" : undefined}
                  data-canary-click-intent="filterApply"
                  data-canary-hold="filter"
                  data-canary-message={allLabel}
                  onFocus={() => notifyFilterInspect(allLabel)}
                  onPointerEnter={() => notifyFilterInspect(allLabel)}
                  onClick={() => setIsOpen(false)}
                  className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors duration-200 focus-visible:bg-dark/[0.06] dark:focus-visible:bg-light/[0.08] ${
                    !hasActiveValues
                      ? "bg-dark/[0.04] text-dark dark:bg-light/[0.07] dark:text-light"
                      : "text-dark/75 hover:bg-dark/[0.04] hover:text-dark dark:text-light/75 dark:hover:bg-light/[0.07] dark:hover:text-light"
                  }`}
                >
                  <GridIcon
                    className={`h-4 w-4 shrink-0 ${
                      !hasActiveValues
                        ? "text-primary dark:text-primaryDark"
                        : "text-dark/65 dark:text-light/65"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex-1 truncate">{allLabel}</span>
                </Link>
              </li>

              {options.map(({ value, label, icon = "tag" }) => {
                const isActive = activeValueSet.has(value);
                const OptionIcon = iconByName[icon] || TagIcon;
                const nextValues = toggleValue(activeValues, value);

                return (
                  <li key={value}>
                    <Link
                      href={{
                        pathname: basePath,
                        query: buildQuery(query, paramName, nextValues),
                      }}
                      scroll={false}
                      aria-label={`${isActive ? "Quitar" : "Agregar"} ${label}`}
                      data-canary-click-intent="filterApply"
                      data-canary-hold="filter"
                      data-canary-message={label}
                      onFocus={() => notifyFilterInspect(label)}
                      onPointerEnter={() => notifyFilterInspect(label)}
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

export default MultiMenuFilterControl;
