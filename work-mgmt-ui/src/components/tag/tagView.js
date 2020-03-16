import React, { Component } from "react";
import TagService from "../../services/tagService";

class TagView extends Component {
  componentName = "TagView";

  constructor() {
    super();
    this.state = {
      tagList: [],
      selectedTag: {}
    };

    console.debug(`[${this.componentName}] constructor()`);
  }

  async componentDidMount() {
    console.debug(`[${this.componentName}] componentDidMount()`);

    const tagList = await TagService.getAllAsync();
    this.setState({ tagList });

    console.debug(`[${this.componentName}] componentDidMount() >> tagList: `, tagList);
  }

  selectedTagChanged = selectedTag => {
    console.debug(`[${this.componentName}] selectedTagChanged()`);
    this.setState({ selectedTag }); // Shortcut for 'this.setState({selectedTag: selectedTag});'
  };

  newTag = () => {
    console.debug(`[${this.componentName}] newTag()`);
  };

  editTag = () => {
    console.debug(`[${this.componentName}] editTag()`);
  };

  deleteTag = () => {
    console.debug(`[${this.componentName}] deleteTag()`, this);
    this.setState(currentState => {
      const updatedTagList = currentState.tagList.filter(
        (value, index, arr) => value.id !== currentState.selectedTag.id
      );
      return { tagList: updatedTagList, selectedTag: {} };
    });
  };

  render() {
    console.debug(`[${this.componentName}] render() >> Rendering...`);

    return (
      <div>
        <p>Tag View</p>
        {/* <div>
          <TagList
            tagList={this.state.tagList}
            selectedTag={this.state.selectedTag}
            newTag={this.newTag}
            editTag={this.editTag}
            deleteTag={this.deleteTag}
            selectedTagChanged={this.selectedTagChanged}
          />
        </div>
        <div>
          <TagDetail
            mode='view'
            tag={this.state.selectedTag} />
        </div> */}
      </div>
    );
  }
}

export default TagView;
