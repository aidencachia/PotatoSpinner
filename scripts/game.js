let revs = 0;

function addRevs(revs) {
    this.revs += revs;
}

function removeRevs(revs) {
    this.revs -= revs;
}

function getRevCount() {
    return this.revs;
}