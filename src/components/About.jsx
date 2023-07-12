

function About() {
  return (
    <div>
      <div className="grid p-2 m-2">
        <span className="mt-2">
          <b>App description:</b> This is a food ordering app created as single
          page app using React. <br />
          Below are few details and features :-
          <ul className="list-disc mx-8 list-inside">
            <li>
              Used vite as bundler.{" "}
              <a
                className="underline"
                href={"https://vitejs.dev/"}
                target={"_blank"} rel="noreferrer"
              >
                Link to docs.
              </a>
            </li>
            <li>
              The app uses realtime swiggy api to fetch the data. The core concept of creating 
              this falcon food delivery app is to meet up the same experience like Swiggy food
              delivery app.
            </li>
            <li>
              Used<b> Swiggy's Public API</b> for fetching Restaurant List and
              Menu.
            </li>
            <li>
              Used <b>FormSpree</b> to get Email from <b>Contact Section</b>.
              <a
                className="underline"
                href={"https://formspree.io/"}
                target={"_blank"} rel="noreferrer"
              >
                Link to docs.
                </a>
            </li>
            <li>
              Loading components on demand using different <b>chunks</b> for
              <b>better performance</b>.
            </li>
            <li>
              Used <b>Shimmer</b> component to make UI more good.
            </li>
            <li>
              Used <b>Tailwind CSS</b> for designing UI.{" "}
              <a
                className="underline"
                href={"https://tailwindcss.com/"}
                target={"_blank"} rel="noreferrer"
              >
                Link to docs.
              </a>
            </li>
            <li>
              Used <b>React Router</b> for routing.{" "}
              <a
                className="underline"
                href={"https://reactrouter.com/en/main"}
                target={"_blank"} rel="noreferrer"
              >
                Link to docs.
              </a>
            </li>
            <li>
              Used <b>Redux Toolkit</b> for state management.{" "}
              <a
                className="underline"
                href={"https://redux-toolkit.js.org/"}
                target={"_blank"} rel="noreferrer"
              >
                Link to docs.
              </a>
            </li>
          </ul>
        </span>
      </div>
    </div>
  );
}

export default About;
