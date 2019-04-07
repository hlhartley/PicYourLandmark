import React from 'react';
import { App } from './App';
import renderer from 'react-test-renderer';

describe('App', () => {
    it('renders correctly', () => {
        const mockProfilePic = 'stringURL'
        const tree = renderer.create(<App profilePic={mockProfilePic} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
