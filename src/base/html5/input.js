import React from 'react';

class BaseInput extends React.Component {
    render () {
        let {_ref, validation, ...rest} = this.props;
        return <input {...rest} ref={_ref} data-validation={validation}/>
    }
}

export default BaseInput;
