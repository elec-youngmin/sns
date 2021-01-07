exports.frontUrl =
  process.env.NODE_ENV === "production"
    ? "https://interfree.co.kr"
    : "http://localhost:3000";

exports.backUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.interfree.co.kr"
    : "http://localhost:80";
