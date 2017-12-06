import React from 'react';
import Pokemon from './Pokemon'

class Pager extends React.Component {
    state = { index: 1 };
  
    render() {
      return (
        <div>
          <Pokemon id={this.state.index} />
  
          <button
            type="button"
            onClick={() =>
              this.setState(({ index }) => ({
                index: index - 1
              }))}
          >
            Previous
          </button>
  
          <button
            type="button"
            onClick={() =>
              this.setState(({ index }) => ({
                index: index + 1
              }))}
          >
            Next
          </button>
        </div>
      );
    }
  }

export default Pager;
