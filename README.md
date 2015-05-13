# React Thrift
A simple [Thrift](https://thrift.apache.org/) service that enables prerendering
of React Components on the server-side using nodejs.

```thrift
service ReactThrift {
    // Given a React component's name and its props, returns the html rendered.
    string renderComponentToString(1:string name, 2:string props)
        throws (1:ServerException err),
}
```

## Usage
1. Register React components and start server.

```js
var s = new Server();
s.registerComponent("Component1", Component1);
s.registerComponent("Component2", Component2);
s.registerComponent("BuggyComponent", BuggyComponent);
s.listen(9090);
```

2. Use whatever server-side language to make RPC to said server.


## Credits
- Inspiration from https://github.com/mhart/react-server-example
