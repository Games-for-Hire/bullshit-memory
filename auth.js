const urlParams = new URLSearchParams(window.location.search);
const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
client.setEndpoint(config.endpoint).setProject(config.projectId);

const value = readCookie(config.sessionName);
if (value.length > 0) {
  const session = JSON.parse(value);
  account.get().then(
    function (response) {
      console.log("account", response); // Success
    },
    function (error) {
      console.log("error", error); // Failure
    }
  );
} else if (urlParams.size < 1) {
  account.createOAuth2Session("github", config.redirect);
}

// workaround, since saving the cookie directly does not work :-/
if (urlParams.get("status") === "okay") {
  window.location.replace("/?status=session");
}

// save the session to a cookie
if (urlParams.get("status") === "session") {
  account.getSession("current").then(
    function (session) {
      account.get().then(
        function (response) {
          var value = JSON.stringify(response);
          setCookie(config.sessionName, value);
          window.location.replace("/");
        },
        function (error) {
          console.log("error", error); // Failure
          clearCookie(config.sessionName);
        }
      );
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}