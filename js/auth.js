const urlParams = new URLSearchParams(window.location.search);
const { Client, Account, Databases, OAuthProvider} = Appwrite;
//const client = new Client();
//const account = new Account(client);

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

const account = new Account(client);
const databases = new Databases(client);

client.setEndpoint(config.endpoint).setProject(config.projectId);
const page = `${config.host}${config.context}app.html`

const PerformLogin = function(config, loginHandler, errorHandler) {
  const value = readCookie(config.sessionName);
  if (value.length > 0) {
    const session = JSON.parse(value);
    account.get().then(
      loginHandler,
      errorHandler
    );
  } else if (urlParams.size < 1) {
    account.createOAuth2Session(OAuthProvider.Github, config.redirect);
  }
}

const CheckSession = function() {
    // workaround, since saving the cookie directly does not work :-/
    if (urlParams.get("status") === "okay") {
      window.location.replace(page + '?status=session');
    }
}

const PersistSession = function(errorHandler) {
  // save the session to a cookie
  if (urlParams.get("status") === "session") {
    account.getSession("current").then(
      function (session) {
        console.log("session", session);
        account.get().then(
          function (response) {
            var value = JSON.stringify(response);
            setCookie(config.sessionName, value);
            window.location.replace(page);
          },
          errorHandler
        );
      },
      errorHandler
    );
  }
}