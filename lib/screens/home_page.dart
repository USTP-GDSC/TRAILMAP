import 'package:floating_bottom_navigation_bar/floating_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:ustp_trailmap/screens/pages/explore_tab.dart';
import 'package:ustp_trailmap/widgets/drawer/drawer_widget.dart';
import 'package:ustp_trailmap/widgets/text_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
        child: FloatingNavbar(
          borderRadius: 10,
          fontSize: 8,
          backgroundColor: Colors.blue,
          selectedItemColor: Colors.blue,
          onTap: (int val) {
            setState(() {
              selectedIndex = val;
            });
          },
          currentIndex: selectedIndex,
          items: [
            FloatingNavbarItem(
                icon: Icons.location_on_rounded, title: 'Explore'),
            FloatingNavbarItem(
                icon: Icons.location_city_rounded, title: 'Buildings'),
            FloatingNavbarItem(icon: Icons.info, title: 'About'),
          ],
        ),
      ),
      body: Center(
        child: IndexedStack(
          index: selectedIndex,
          children: [
            const ExploreTab(),
            Center(
              child: TextRegular(
                  text: 'Insert Here', fontSize: 18, color: Colors.black),
            ),
            Center(
              child: TextRegular(
                  text: 'Insert Here', fontSize: 18, color: Colors.black),
            ),
          ],
        ),
      ),
    );
  }
}
