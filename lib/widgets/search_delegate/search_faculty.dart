import 'package:flutter/material.dart';

import '../text_widget.dart';

class SearchFaculty extends SearchDelegate {
  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
        onPressed: () {
          if (query != '') {
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                duration: Duration(seconds: 1),
                content: Text('No Input. Cannot Procceed'),
              ),
            );
          }
        },
        icon: const Icon(
          Icons.search,
          color: Colors.blue,
        ),
      ),
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
      onPressed: () {
        close(context, null);
      },
      icon: const Icon(Icons.arrow_back),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return Container();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return SizedBox(
      child: ListView.separated(
        itemCount: 50,
        separatorBuilder: ((context, index) {
          return const Divider();
        }),
        itemBuilder: ((context, index) {
          return ListTile(
            leading: const CircleAvatar(
              minRadius: 50,
              maxRadius: 50,
              backgroundColor: Colors.black,
            ),
            title: TextBold(
                text: 'Lorem Ipsum', fontSize: 14, color: Colors.black),
            subtitle: TextRegular(
                text: 'Lorem Ipsum', fontSize: 12, color: Colors.grey),
            trailing: const Icon(Icons.arrow_forward_ios_rounded),
          );
        }),
      ),
    );
  }
}
