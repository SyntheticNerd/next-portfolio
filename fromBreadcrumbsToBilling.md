# From Breadcrumbs to Billing

- [From Breadcrumbs to Billing](#from-breadcrumbs-to-billing)
  - [Overview](#overview)
  - [What I Worked On](#what-i-worked-on)
    - [Breadcrumb Component](#breadcrumb-component)
      - [Code Explanation](#code-explanation)
      - [Use Parsed Location](#use-parsed-location)

## Overview

As the saying goes, "teamwork makes the dream work." And in software development, this couldn't be more true. Working collaboratively with a group of talented individuals can lead to some truly remarkable outcomes.

As a member of the development team, I had the privilege of working alongside some incredibly talented engineers who were among the best at the company. Their knowledge and expertise were invaluable, and I learned a great deal from them throughout the process.

But what stood out to me was the support and encouragement I received from my lead; they recognized my potential and gave me opportunities to work on more complex tasks, challenging me and allowing me to grow as a developer.

## What I Worked On

### Breadcrumb Component

One component I am responsible for creating is the Breadcrumb Component using React Styled Components and React Router. The component parses the current location using the `useLocation()` hook provided by React Router and creates a breadcrumb trail. This trail is designed to put anywhere in the application where a user may want to be able to navigate backwards in the sitemap.

#### Code Explanation

The component is composed of three main parts:

- `useParsedLocation()` function: This function parses the current location and returns a map of path segments and their corresponding labels. The function also handles special cases where specific path segments should not be included in the breadcrumb trail.
- `Crumb` component: This component takes in the key name, index, and path map as props and renders a breadcrumb item with a link to the corresponding path segment. The component also handles formatting the label for each path segment.
- `Breadcrumbs` component: This component renders the breadcrumb container and styled breadcrumb list. It uses the `useParsedLocation()` function to generate the breadcrumb trail and the `Crumb` component to render each breadcrumb item.

#### Use Parsed Location

The most important part of this component is the `useParsedLocation()` function.

```js
import { useLocation } from "react-router-dom";

const useParsedLocation = () => {
	const { pathname } = useLocation();
	// pathname ex. "/dashboard/organizations/update-user"

	const pathMap: StringMap = {};
	let pathString = "";
	const terminators = ["update-user", "user"];
	let end = false;

	pathname.split("/").forEach((pathItem) => {
		if (!pathItem.length || pathItem === "dashboard") {
			pathMap.dashboard = "/";
		} else if (pathItem !== ":id" && !end) {
			if (terminators.indexOf(pathItem) > -1) {
				end = true;
			}
			pathString += `/${pathItem}`;
			const pathLabel = pathItem
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");
			pathMap[pathLabel] = pathString;
		}
	});
	// pathMap after parsing pathname
	// {
	//	"Dashboard": "/",
	//	"Organizations": "/dashboard/organizations",
	//	"Update User": "/dashboard/organizations/update-user",
	// };
	return pathMap;
};
```

Once we invoke this function, we can utilize the pathmap Object and iterate over it using `Object.keys()`, where we can use the key as a label and the corresponding value as the path for the router.
