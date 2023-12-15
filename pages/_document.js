import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render(){
        return(
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
// The _document.js file in Next.js helps define the HTML structure of our app's across all its pages.