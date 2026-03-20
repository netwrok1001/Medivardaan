"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * TableWrapper Component
 *
 * Single source of truth for all table styling in the application.
 * Visual appearance (gradient, borders, header bg, row hover) is fully
 * controlled by the `.card-gradient` CSS class in `globals.css` —
 * edit that file to update every table in the project at once.
 *
 * Usage (minimal — no className needed for standard tables):
 *   <TableWrapper>
 *     <Table>...</Table>
 *   </TableWrapper>
 *
 * With layout overrides only (e.g. margin, overflow):
 *   <TableWrapper className="mt-4 overflow-x-auto">
 *     <Table>...</Table>
 *   </TableWrapper>
 */
const TableWrapper = React.forwardRef(
  ({ children, className, contentClassName, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("card-gradient p-0", className)}
        {...props}
      >
        <CardContent
          className={cn("p-0 overflow-x-auto", contentClassName)}
        >
          {children}
        </CardContent>
      </Card>
    );
  }
);

TableWrapper.displayName = "TableWrapper";

export { TableWrapper };
