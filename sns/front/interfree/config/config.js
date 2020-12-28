exports.frontUrl =
  process.env.NODE_ENV === "production"
    ? "http://interfree.co.kr"
    : "http://localhost:3000";

exports.backUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.interfree.co.kr"
    : "http://localhost:80";
