const hardCodedTagList = [
  { "id": 1, "name": "tag01", "deleted": 0, "modifiedOn": "2020-01-01T01:00:01Z" },
  { "id": 2, "name": "tag02", "deleted": 0, "modifiedOn": "2020-01-01T01:00:02Z" },
  { "id": 3, "name": "tag03", "deleted": 0, "modifiedOn": "2020-01-01T01:00:03Z" }
];

class TagService {
  constructor() {
    this.tagList = hardCodedTagList;
  }

  getAll() {
    return this.tagList;
  }

  get(id) {

  }

  update(workItem) {

  }

  delete(id) {

  }
}

// Create Singleton service and export it
export default new TagService();
