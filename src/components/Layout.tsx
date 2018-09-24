import * as React from "react";
import { Link } from "gatsby";
import { injectGlobal } from "react-emotion";

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 16px;
    background-color: #eee;
    min-width: 800px;
  }
`;

const Header = () => (
  <header
    css={{
      padding: "0 40px"
    }}
  >
    <h1>
      <Link
        to="/"
        css={{
          textDecoration: "none",
          color: "black"
        }}
      >
        Coeuvre's Blog
      </Link>
    </h1>
  </header>
);

class Main extends React.Component {
  public render() {
    return (
      <main css={{ display: "flex", flexDirection: "row", marginBottom: 40 }}>
        {this.props.children}
      </main>
    );
  }
}

class Layout extends React.Component {
  public render() {
    return (
      <div
        css={{
          width: 800,
          margin: "0px auto",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Header />
        <Main>{this.props.children}</Main>
      </div>
    );
  }
}

export default Layout;
