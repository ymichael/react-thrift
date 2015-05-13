namespace js reactthrift


exception ServerException {
    1:string error
}


service ReactThrift {
    /**
     * Given a React component's name and its props, returns the html rendered.
     */
    string renderComponentToString(1:string name, 2:string props)
        throws (1:ServerException err),
}