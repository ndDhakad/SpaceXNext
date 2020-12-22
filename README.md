This project is hosted at [`https://space-xn-ext.vercel.app/`](https://space-xn-ext.vercel.app/).

## About
This is an assignment for Space X Launch Details.
This application is built using Next.js to serve the requirement for server side rendering(SSR). 
I have used [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) provided by the creators of Next.js, to deploy the app as it was the easiest way for quick CI/CD. 


##  Design, Accessibility and Semantic markup

- I have tried to achieve the same UI as expected in addition to it I have also added 'Reset All' button to go back to the original state with no filters applied. 
- I have used 'Grid' system to achieve responsive behaviour for all kinds of devices.
- I have tried to keep my code modular by creating components like projectCard/ noDataAlert/ sidePanel that can be reused across the application. 

## Server Side Functionality
Have achieved following requirement using Next.js
- The initial launch programs landing page has to be server side rendered.

## Client Side Functionality
Following requirements are taken care of with the help of 'useRouter' from 'next/router'.
- User should be able to Filter the results with help of provided Filters.
            ▪ Filter options are hard coded with the values shown in the visual comp below.
            ▪ Applying any Filter should reflect the below changes:
                • Selected filter should change to selected state as shown in the visual comp.
                • Applied filters should change the URL and update the Page with latest records without refreshing the page.
                • If the page is refreshed with the applied filters in the URL – the resulting page should be server side rendered & subsequent filters should again be client side rendered.
- Columns have the same height in a given row
- I have used lazy loading for images using 'next/image', so the images are downloaded as we scroll down thru the page. Is also retuns image in 'webp' type which is an optimised format. The size of image is also reduced significantly.

## Code Structure 
- I have tried to make code as modular as possible. Created seperate componets for Project Cards, Side Filet panel, Layout, No Data Alert. These can be reused wherever required.
- Have the global styling in global.css file.
- I have used React Hook to manage state for current requirement of the application . Redux can also be implemented.

## CI/CD
Both CI and CD are handled by versel as it was very easy to configure. As soon as I update my master branch the pipeline gets triggered and the app get deployed.

## Miscellaneous
I used Chrome's Lighthouse extension to monitor the performance and improved the performance by optimizing image rendering and SSR. 

## Assumptions Issues Faced
- Found few null values for landing_success field. I replace the null values with 'NA' as I thought null is not a value user would like to see on the UI.
- There were few image urls which has null values, this was throwing error while rendering. I replace null with dummy image url, so a question mark image would appear in place whre image url is not present.
- Faced issue initially with route but then was able to overcome it by trying few things.
