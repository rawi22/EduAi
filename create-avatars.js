// Create teacher avatar placeholders for each subject
const subjects = ['math', 'science', 'history', 'literature', 'english', 'general'];

subjects.forEach(subject => {
  const placeholder = `# ${subject.charAt(0).toUpperCase() + subject.slice(1)} teacher avatar placeholder`;
  fs.writeFileSync(`/home/ubuntu/new_improvements/public/avatars/${subject}-teacher.png`, placeholder);
});
