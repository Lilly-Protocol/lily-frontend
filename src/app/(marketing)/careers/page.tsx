import type { Metadata } from "next";

import { CareersContent } from "@/features/careers/careers-content";
import { cultureSections, openRoles } from "@/features/careers/mock-roles";
import { createScaffoldMetadata } from "@/features/scaffold/page-factory";

export const metadata: Metadata = createScaffoldMetadata("careers");

export default function CareersPage() {
  return <CareersContent culture={cultureSections} roles={openRoles} />;
}
