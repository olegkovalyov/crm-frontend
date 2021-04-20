import React, { ReactElement } from 'react';
import { Typography, Breadcrumbs } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import { breadcrumbs } from '../../../constants/route.constants';


export const AppBreadcrumbs = (): ReactElement => {
  const router = useRouter();
  const breadcrumbsJsx = breadcrumbs.map(route => {
    let linksJsx: ReactElement[];
    if (route.path === router.pathname) {
      linksJsx = route.parts.map((singlePart, index) => {

        let { title } = singlePart;

        if (singlePart.title.charAt(0) === '['
          && singlePart.title.charAt(singlePart.title.length - 1) === ']'
        ) {
          const key = singlePart.title.slice(1, -1);
          title = router.query[key] as string;
        }

        if ((index === route.parts.length - 1)
          && route.parts.length !== 1
        ) {
          return <Typography color="textPrimary">
            {title}
          </Typography>;
        }

        return <Link
          key={singlePart.url}
          color="inherit"
          href={singlePart.url}
        >
          {title}
        </Link>;
      });
    }
    return linksJsx;
  });

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbsJsx}
      </Breadcrumbs>
    </>
  );
};
