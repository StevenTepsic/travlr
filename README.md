CS-465 Full Stack Web Application Travlr
================================================================================

ARCHITECTURE
--------------------------------------------------------------------------------

This project used three distinct approaches to frontend development across
different parts of the application. The customer-facing side started as a
traditional Express HTML setup, where the server used Handlebars templates to
render complete HTML pages and send them to the browser on every request. The
browser had no application logic of its own. JavaScript was used sparingly for
small interactive elements but played no structural role in how pages were
built or served. The admin side took a completely different approach using
Angular as a single-page application (SPA). Instead of the server rendering
pages, Angular compiled TypeScript into JavaScript that ran entirely in the
browser. The router handled navigation by swapping components in and out of
the view without reloading the page, and the HTTP client communicated with the
REST API in the background to fetch and update data. The SPA felt more like a
desktop application than a website and gave the admin interface a level of
responsiveness that server-rendered pages cannot match.

MongoDB was chosen for the backend because it stores data as documents in a
JSON-like format (BSON), which maps directly to how data flows through the
rest of the stack. Trip records in the database look nearly identical to the
JavaScript objects the Angular components work with, which removes the need
for complex mapping layers between the database and the application. MongoDB
also handles schema flexibility better than a relational database would for
a project like this, where the trip data model evolved throughout development.


FUNCTIONALITY
--------------------------------------------------------------------------------

JSON (JavaScript Object Notation) is a lightweight data format, not a
programming language. JavaScript is a full programming language with logic,
functions, loops, and behavior. JSON is a subset of JavaScript object syntax
used purely to represent structured data as text, with no methods or
executable code. It is the common language that ties the frontend and backend
together in this project. When Angular sends a POST or PUT request to the
Express API, it serializes the form data as a JSON string in the request body.
The Express server parses that string back into a JavaScript object, passes it
to Mongoose, and saves it to MongoDB. When the API responds, it serializes the
Mongoose document back to JSON, Angular parses it into a TypeScript object,
and the component binds it to the template. Every layer of the stack reads and
writes the same format, which is what makes the MEAN stack work as cleanly as
it does.

Several rounds of refactoring happened throughout this project. The trip data
started as a hardcoded array in a static TypeScript file and was later moved
into MongoDB so it could be created, read, updated, and deleted through the
API. The trip-listing component was initially populated directly from that
static import, which meant it always showed the same three trips regardless
of what was in the database. Replacing the static initialization with an empty
array and letting the HTTP service populate it made the component genuinely
data-driven. The trip-card component is a good example of the benefits of
reusable UI components. Rather than duplicating the card markup every time a
trip needed to be displayed, a single component accepted a trip object as an
input and rendered it consistently everywhere it was used. When the card
layout or styling needed to change, there was one place to change it.


TESTING
--------------------------------------------------------------------------------

Testing a full stack application means verifying that the right data moves
correctly through every layer in both directions. HTTP methods define what kind
of operation a request performs: GET retrieves data without changing it, POST
creates a new record, PUT updates an existing one, and DELETE removes one.
Endpoints are the specific URL paths that map to those operations, such as
GET /api/trips to list all trips or PUT /api/trips/:tripCode to update a
specific one.

I tested each endpoint in Postman before connecting Angular to the API. That
approach let me verify the Express routes and Mongoose logic worked correctly
in isolation before adding the frontend layer. Once the raw endpoints were
confirmed, I used the browser's Network and Console tabs to verify the Angular
HTTP service was sending the right requests and handling the responses
correctly. Adding JWT authentication introduced a new category of testing
complexity. A request that worked fine without security would return a 401
after authentication was added if the Authorization header was missing or
malformed. I had to verify both that protected endpoints rejected unauthenticated
requests and that the Angular interceptor was correctly attaching the token to
outgoing requests. The interceptor issue turned out to require an explicit
configuration flag (withInterceptorsFromDi) in the Angular HTTP provider
setup, which only became visible because the 401 responses were logged clearly
enough to trace back to the missing header.


REFLECTION
--------------------------------------------------------------------------------

This course pushed me further into full stack development than any previous
coursework. Before it, I had worked with individual pieces of the stack in
isolation: Express for routing, MongoDB for storage, Angular for components.
Building them together into a working application with authentication, a REST
API, and two different frontend experiences revealed how the pieces connect
and where things break when they do not connect correctly. The debugging work
throughout this project was as valuable as the implementation itself. Tracing
a 401 error from a browser console through an Angular interceptor, across a
CORS preflight, and into an Express middleware function required understanding
all four layers at the same time.

The skills I developed here map directly to what employers look for in a
full stack developer role: REST API design, Angular component architecture,
MongoDB schema design, JWT authentication, and experience debugging across
the entire request-response cycle. Red team work I do outside of school has
always shown me what insecure applications look like from the outside. This
course gave me a clearer picture of how to build them more securely from the
inside. That combination is what I want to keep building on professionally.
