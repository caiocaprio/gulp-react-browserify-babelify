# web-portal
![T-REX](/.picturesForReadme/t-rex.jpg)

MVP of new Portal Nextel.

# Pull Requests and Git flow
![GIT-FLOW](/.picturesForReadme/git-flow.png)
#### To see current features pull request

[Opens pull requests](https://gitlab.nexteldigital.com.br/NextelDigital/web-portal/merge_requests)

#### Branches naming
You can only create branches named like this:

- feature/[FEATURE_NAME]
- fix/[FIX_NAME]
- release/[VERSION]

### General Rules

- We should not commit to the `master` branch
- 2 persons need to approve every Merge Request before it be merged
- A merge request can be composed by more than one commit if that makes sense
- ⚠️ The person that is going to merge the MR should be the same one that opened it ⚠️






# Getting started


Configure config global

```sh
git config --global user.name "Your Name"
git config --global user.email "your.mail@nextel.com.br"
```

Clone the repository 

```sh
cd D:\PROJECTS\
git clone git@gitlab.nexteldigital.com.br:NextelDigital/web-portal.git web-portal
cd web-portal
```

Switch branch

 ```sh
git checkout develop
```


Create your branch for working
 ```sh
git checkout -b feature/task
git checkout -b fix/FIX_NAME
git checkout -b release/VERSION
```

Commit and Push
 ```sh
git add .
git commit -m 'message'
git push origin develop
```

Commit and Push

 ```sh
git add .
git commit -m 'message'
git push origin develop
```
