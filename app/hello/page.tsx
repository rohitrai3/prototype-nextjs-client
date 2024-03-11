const getData = async () => {
  const res = await fetch("http://localhost:8081/hello", {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });

  console.log(res);

  return res.text();
};

export default async function Home() {
  const data = await getData();

  return (
    <div>
      Fetched data: <span>{data}</span>
    </div>
  );
}
