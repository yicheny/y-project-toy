let uniqKeyFlag = 0;
export function uniqKeyFor() {
    uniqKeyFlag++;
    return "".concat("u-", new Date().getTime(), "-", uniqKeyFlag);
}
