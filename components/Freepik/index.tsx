const Freepik = ({ link, name1, name2 }: { link: string; name1: string; name2: string }) => (
  <div style={{ marginTop: 20, textAlign: 'right' }}>
    <a href={link}>{name1}</a> {name2}
  </div>
);

export default Freepik;
