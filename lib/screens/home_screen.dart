import 'package:flutter/material.dart';
import 'package:tabler_icons/tabler_icons.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:slide_indexed_stack/slide_indexed_stack.dart';

import 'pages/home_page.dart';
import 'pages/explore_page.dart';
import 'pages/navigate_page.dart';
import 'pages/community_page.dart';
import 'pages/profile_page.dart';

import '../components/bottom_drawer.dart';
import '../components/bottom_navbar.dart';

import '../plugins/fade_indexed_stack.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with AutomaticKeepAliveClientMixin<HomeScreen> {
  @override
  bool get wantKeepAlive => true;

  int _selectedPage = 2;

  // pages
  static final List<Widget> _pageOptions = <Widget>[
    homePage(),
    explorePage(),
    navigatePage(),
    communityPage(),
    profilePage()
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
    super.build(context);

    return Scaffold(
        // backgroundColor: const Color(0xFF2f3542),
        backgroundColor: Colors.white,
        body: _pageWithDrawerOverlay(),
        bottomNavigationBar: _pageNavigationBar());
  }

  Widget _pageWithDrawerOverlay() {
    // sheet->(transition->page)
    return (SlidingUpPanel(
      backdropEnabled: true,
      maxHeight: 320,
      minHeight: 15,
      color: Colors.white,
      borderRadius: const BorderRadius.vertical(top: Radius.circular(8)),
      panel: const BottomDrawer(),
      body: _pageOnSwitchTransition(),
    ));
  }

  Widget _pageOnSwitchTransition() {
    return SlideIndexedStack(
      axis: Axis.horizontal,
      slideOffset: 0.1,
      index: _selectedPage,
      duration: const Duration(milliseconds: 200),
      children: _pageOptions,
    );

    // return FadeIndexedStack(
    //   duration: const Duration(milliseconds: 200),
    //   index: _selectedPage,
    //   children: _pageOptions,
    // );
  }

  void _handlePageSwitch(index) {
    setState(() {
      _selectedPage = index;
    });
  }

  Widget _pageNavigationBar() {
    return (BottomNavBar(
      selectedIndex: 2,
      handlePage: _handlePageSwitch,
      children: _tabButtons,
    ));
  }
}
