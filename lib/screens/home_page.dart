import 'package:floating_bottom_navigation_bar/floating_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';
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
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
        child: FloatingNavbar(
          borderRadius: 10,
          fontSize: 8,
          backgroundColor: Colors.black,
          selectedItemColor: Colors.black,
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
        child: Column(
          children: [
            Stack(
              children: [
                Image.asset(
                  'assets/images/trailmap 1.png',
                  fit: BoxFit.cover,
                  height: 570,
                  width: double.infinity,
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(30, 70, 30, 0),
                  child: Container(
                    height: 55,
                    width: double.infinity,
                    child: Center(
                      child: ListTile(
                        title: TextRegular(
                            text: 'Search here',
                            fontSize: 14,
                            color: Colors.blue),
                        leading: IconButton(
                          onPressed: () {},
                          icon: const Icon(Icons.menu, color: Colors.blue),
                        ),
                        trailing: const CircleAvatar(
                          minRadius: 15,
                          maxRadius: 15,
                          backgroundColor: Colors.blue,
                        ),
                      ),
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(100),
                      border: Border.all(color: Colors.black),
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: Container(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const Padding(
                      padding: EdgeInsets.only(left: 150, right: 150),
                      child: Divider(
                        color: Colors.grey,
                        thickness: 5,
                      ),
                    ),
                    TextRegular(
                        text: 'University of Science and Technology',
                        fontSize: 15,
                        color: Colors.black),
                    TextRegular(
                        text: 'of Southern Philippines',
                        fontSize: 15,
                        color: Colors.black),
                    const SizedBox(
                      height: 10,
                    ),
                    const Divider(
                      color: Colors.grey,
                      thickness: 0.5,
                    ),
                  ],
                ),
                height: 10,
                width: double.infinity,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
