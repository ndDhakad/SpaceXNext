This project is hosted at [`https://space-xn-ext.vercel.app/`](https://space-xn-ext.vercel.app/).

## About

This application is built using Next.js to serve the requirement for server side rendering(SSR). 
I have used [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) provided by the creators of Next.js, to deploy the app as it was the easiest way for quick CI/CD. 

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

##  Design, Accessibility and Semantic markup

- I have tried to achieve almost the same UI as expected. I have Changed the 'Launch Year' filter to drop-down, 
so that is number of years increases a select list can represent this filter in better way.
- I have used 'Grid' system to achieve responsive behaviour for all kinds of devices.
- I have tried to kep my code modular and created components like projectCard/ noDataAlert/ sidePanel that can be reused accross the application. 

## Server Side Functionality
Have achieved following requirement using Next.js
- The initial launch programs landing page has to be server side rendered.
- A boilerplate to implement the Server-side rendering can be used.

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
- 


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
