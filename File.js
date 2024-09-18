class File {
  static isFile(path) {
    const normalizedPath = path.replace(/[/\\]+/g, "/");
    const trimmedPath = normalizedPath.replace(/\/+$/, "");
    const segments = trimmedPath.split("/");
    const lastSegment = segments[segments.length - 1];

    if (!lastSegment) {
      return false;
    }

    const driveLetterPattern = /^[a-zA-Z]:$/;
    const uncPathPattern = /^\/{2,}[^/]+\/[^/]+/;

    if (
      driveLetterPattern.test(lastSegment) ||
      uncPathPattern.test(normalizedPath)
    ) {
      return false;
    }

    if (
      lastSegment.includes(".") &&
      !lastSegment.startsWith(".") &&
      !lastSegment.endsWith(".")
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default File;
