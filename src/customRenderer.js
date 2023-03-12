import ReactReconciler from 'react-reconciler';

const hostConfig = {
    supportsMutation: true,
    getRootHostContext: () => {
        return {};
    },
    getChildHostContext: () => {
        return {};
    },
    prepareForCommit: () => true,
    resetAfterCommit: () => {},
    shouldSetTextContent: (args1, props) => {
        console.log('shouldSetTextContent args1', args1);
        return typeof props.children === 'string' || typeof props.children === 'number';
    },
    createInstance(
        type,
        newProps,
        rootContainerInstance,
        _currentHostContext,
        workInProgress
    ) {
        const ele = document.createElement(type);
        for (const iterator in newProps) {
            const propsName = iterator;
            const propsValue = newProps[iterator];

            if (propsName === 'onClick') {
                ele.addEventListener('click', propsValue);
            } else if (propsName === 'children') {
                if (typeof propsValue === 'string' ||typeof propsValue === 'number' ) {
                    ele.textContent = propsValue;
                }
            } else if (propsName === 'className') {
                ele.setAttribute('class', propsValue);
            } else {
                ele.setAttribute(propsName, propsValue);
            }
        }
        return ele;
    },
    createTextInstance: (text) => {
        return document.createTextNode(text);
    },
    finalizeInitialChildren: () => {},
    clearContainer: () => {},
    appendInitialChild: (parent, child) => {
        parent.appendChild(child);
    },
    appendChild(parent, child) {
        parent.appendChild(child);
    },
    appendChildToContainer: (parent, child) => {
        parent.appendChild(child);
    },
    prepareUpdate(domElement, oldProps, newProps) {
        return true;
    },
    commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
        Object.keys(newProps).forEach((propName) => {
          const propValue = newProps[propName];
          if (propName === "children") {
            if (typeof propValue === "string" || typeof propValue === "number") {
              domElement.textContent = propValue;
            }
          } else {
            const propValue = newProps[propName];
            domElement.setAttribute(propName, propValue);
          }
        });
    },
    commitTextUpdate(textInstance, oldText, newText) {
        textInstance.text = newText;
    },
    removeChild(parentInstance, child) {
        parentInstance.removeChild(child);
    }
};

const ReactReconcilerInst = ReactReconciler(hostConfig);


export default {
    render: (reactElement, domElement, callback) => {
        console.log('ReactReconcilerInst render');
        if (!domElement._rootContainer) {
            domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
        }
        return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
    }
}

