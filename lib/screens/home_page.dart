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

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedPage = 2;

  // pages
  static const List<Widget> _widgetOptions = <Widget>[
    HomeTab(),
    ExploreTab(),
    NavigateTab(),
    CommunityTab(),
    ProfileTab()
  ];

  // tabs
  static const List<GButton> _widgetButtons = <GButton>[
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
        body: _getBottomSheetWrap(),
        bottomNavigationBar: _getPageNavigationBar());
  }

  Widget _getBottomSheetWrap() {
    // transitioned page widgets are wrapped by the bottom sheet
    return (SlidingUpPanel(
      backdropEnabled: true,
      maxHeight: 400,
      minHeight: 20,
      color: Colors.white,
      borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(8), topRight: Radius.circular(8)),
      panel: Column(
        children: [
          _getSheetIndicator(),
          const Padding(
            padding: EdgeInsets.only(top: 150),
            child: Center(
              child: Text("This is the sliding Widget"),
            ),
          ),
        ],
      ),
      body: _getPageTransitionWrap(),
    ));
  }

  Widget _getPageTransitionWrap() {
    // page widgets are wrapped within a transition widget
    return (BottomBarPageTransition(
      builder: (_, index) => Center(
        // the actual page widgets
        child: _widgetOptions.elementAt(index),
      ),
      currentIndex: _selectedPage,
      totalLength: _widgetOptions.length,
      transitionType: TransitionType.slide,
      transitionCurve: Curves.ease,
      transitionDuration: const Duration(milliseconds: 200),
    ));
  }

  Widget _getPageNavigationBar() {
    return Container(
      color: Colors.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Flexible(
              child: (Container(
            constraints: const BoxConstraints(maxWidth: 850),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
              child: GNav(
                // actions
                selectedIndex: _selectedPage,
                onTabChange: (page) => {
                  setState(() {
                    _selectedPage = page;
                  })
                },
                // styling
                tabBackgroundColor: const Color.fromARGB(178, 214, 214, 214),
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.all(10),
                backgroundColor: Colors.white,
                gap: 8,
                // children
                tabs: _widgetButtons,
              ),
            ),
          ))),
        ],
      ),
    );
  }

  Widget _getSheetIndicator() {
    return (Padding(
      padding: const EdgeInsets.all(7),
      child: SizedBox(
        width: 40,
        height: 5,
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFFDBDBDB),
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
    ));
  }
}
