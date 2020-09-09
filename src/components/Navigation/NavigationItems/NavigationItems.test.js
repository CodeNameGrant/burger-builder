import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({
  adapter: new Adapter()
});

describe('<NavigtionItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two exact <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);

    // const navItems = [
    //   <NavigationItem link='/'>Burger Builder</NavigationItem>,
    //   <NavigationItem link='/auth'>Login / Signup</NavigationItem>
    // ];
    // expect(wrapper.contains(navItems)).toEqual(true);

    expect(wrapper.contains(<NavigationItem link='/'>Burger Builder</NavigationItem>)).toEqual(true);
    expect(wrapper.contains(<NavigationItem link='/auth'>Login / Signup</NavigationItem>)).toEqual(true);

  });

  it('should render three exact <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ authenticated: true });

    expect(wrapper.find(NavigationItem)).toHaveLength(3);

    const navItems = [
      <NavigationItem link='/'>Burger Builder</NavigationItem>,
      <NavigationItem link='/orders'>Orders</NavigationItem>,
      <NavigationItem link='/logout'>Logout</NavigationItem>
    ];
    expect(wrapper.contains(navItems)).toEqual(true);
  });
});