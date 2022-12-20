import 'package:flutter/material.dart';
import 'package:tabler_icons/tabler_icons.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:bottom_bar_page_transition/bottom_bar_page_transition.dart';

import './pages/home_tab.dart';
import './pages/explore_tab.dart';
import './pages/navigate_tab.dart';
import './pages/community_tab.dart';
import './pages/profile_tab.dart';

import '../components/bottom_drawer.dart';
import '../components/bottom_navbar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedPage = 2;

  // pages
  static final List<Widget> _tabOptions = <Widget>[
    homeTab(),
    exploreTab(),
    navigateTab(),
    communityTab(),
    profileTab()
  ];

  // tabs
  static const List<GButton> _tabButtons = <GButton>[
    GButton(
      icon: TablerIcons.home,
      text: 'Home',
    ),
    GButton(
      icon: TablerIcons.map,
      text: 'Explore',
    ),
    GButton(
      icon: TablerIcons.map_pin,
      text: 'Navigate',
    ),
    GButton(
      icon: TablerIcons.friends,
      text: 'Community',
    ),
    GButton(
      icon: TablerIcons.user,
      text: 'Profile',
    )
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFF2f3542),
        body: _pageWrapper(),
        bottomNavigationBar: _pageNavBar());
  }

  void handlePage(index) {
    setState(() {
      _selectedPage = index;
    });
  }

  Widget _pageWrapper() {
    return _pageDrawer();
  }

  Widget _pageDrawer() {
    // sheet->(transition->page)
    return (SlidingUpPanel(
      backdropEnabled: true,
      maxHeight: 320,
      minHeight: 15,
      color: Colors.white,
      borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(8), topRight: Radius.circular(8)),
      panel: const BottomDrawer(),
      body: _pageTransition(),
    ));
  }

  Widget _pageTransition() {
    // transition->page
    return (BottomBarPageTransition(
      builder: (_, index) => _tabOptions.elementAt(index),
      currentIndex: _selectedPage,
      totalLength: _tabOptions.length,
      transitionType: TransitionType.slide,
      transitionCurve: Curves.ease,
      transitionDuration: const Duration(milliseconds: 200),
    ));
  }

  Widget _pageNavBar() {
    return (BottomNavBar(
      selectedIndex: 2,
      handlePage: handlePage,
      children: _tabButtons,
    ));
  }
}
