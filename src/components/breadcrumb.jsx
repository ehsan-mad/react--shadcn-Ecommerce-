import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function BreadcrumbWithCustomSeparator({ items = [] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <Link to={item.path}>{item.name}</Link>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
