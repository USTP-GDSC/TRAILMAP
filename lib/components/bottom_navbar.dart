import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

class BottomNavBar extends StatelessWidget {
  final int selectedIndex;
  final Function handlePage;
  final List<GButton> children;

  const BottomNavBar(
      {super.key,
      required this.selectedIndex,
      required this.handlePage,
      required this.children});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Flexible(
              child: (Container(
            constraints: const BoxConstraints(maxWidth: 850),
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: GNav(
                // actions
                selectedIndex: selectedIndex,
                onTabChange: (index) => handlePage(index),
                // styling
                tabBackgroundColor: const Color.fromARGB(178, 214, 214, 214),
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.all(10),
                backgroundColor: Colors.white,
                gap: 8,
                // children
                tabs: children,
              ),
            ),
          ))),
        ],
      ),
    );
  }
}
