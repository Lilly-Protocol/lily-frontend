export type LocationType = "Remote" | "Hybrid" | "On-site";

export type OpenRole = {
  readonly id: string;
  readonly title: string;
  readonly team: string;
  readonly location: string;
  readonly locationType: LocationType;
  readonly applyHref: string;
};

export type CultureSection = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
};
