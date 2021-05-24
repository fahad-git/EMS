const Src = process.env.PUBLIC_URL;


var footerContactUsHtml = "Head Office NevonSolutions (Mumbai) – Head Office " +
"710, Nevon Solutions Pvt. Ltd, " +
"7th Floor, Vihan Complex, " +
"Sonawala Road, Goregaon East, " +
"Mumbai 400063, "+
"Maharashtra, India.";

var footerAboutUsHtml = "This is an Online event management system software project that serves the functionality of an event manager. The system allows only registered users to login and new users are allowed to resister on the application."

var footerServicesHtml = "Our services include virtual events that anyone can attend from anywhere at anytime."

const footerContent =  [{
    id:1,
    source:Src + "/about.svg",
    title:"About US",
    text:footerAboutUsHtml,
    footerText:"Last updated 3 hours ago"
},{
    id:2,
    source:Src + "/services.svg",
    title:"Services",
    text:footerServicesHtml,
    footerText:"Last updated 3 hours ago"
},{
    id:3,
    source:Src + "/contact.svg",
    title:"Contact Us",
    text:footerContactUsHtml,
    footerText:"Last updated 3 hours ago"
}
]

export default footerContent;