import React, { Component } from 'react'


// For fake json -> https://jsonplaceholder.typicode.com/

export default class Test extends Component {

    state ={
        text: 'test',
        title: '',
        body: '',
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => this.setState({
                    title: data.title,
                    body: data.body
            }));
    }

    // this method is deprecated, but UNSAFE_ will make it run anyway
    // UNSAFE_componentWilldMount(){
    //       console.log('component will mount...')
    // }

    // componentDidUpdate(){
    //     console.log('component did update...')
    // }

    // componentWillReceiveProps(nextProps, nextState){
    //     console.log('componentWillReceiveProps...')
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState){
    //     return null;
    // }

    render() {

        const { title,body } = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        )
    }
}
