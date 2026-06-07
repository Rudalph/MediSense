import { NextResponse } from "next/server";
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  "neo4j+s://dc69d601.databases.neo4j.io",
  neo4j.auth.basic(
    "dc69d601",
    "GAPKJhrbYoVDAFfG9olohr6VdW-GGvTUDuuNCSSGObE"
  )
);

export async function POST(req) {
  const session = driver.session();

  try {
    const body = await req.json();
    const question = body.question;

    if (!question || question.trim() === "") {
      return NextResponse.json(
        { error: "Brand name is required" },
        { status: 400 }
      );
    }

    const inputValue = question.trim();

    const cypherQuery = `
      MATCH (inputBrand:Brand)-[:HAS_GENERIC]->(g:Generic)
      WHERE toLower(inputBrand.name) = toLower($inputValue)

      MATCH (relatedBrand:Brand)-[:HAS_GENERIC]->(g)

      RETURN
        relatedBrand.name AS brandName,
        g.name AS genericName,
        relatedBrand.price AS price,
        relatedBrand.strength AS strength,
        relatedBrand.package AS packageName,
        relatedBrand.company_name AS companyName
      ORDER BY relatedBrand.name
    `;

    const result = await session.run(cypherQuery, { inputValue });

    const data = result.records.map((record) => ({
      brandName: record.get("brandName"),
      genericName: record.get("genericName"),
      price: record.get("price"),
      strength: record.get("strength"),
      packageName: record.get("packageName"),
      companyName: record.get("companyName"),
    }));

    if (data.length === 0) {
      return NextResponse.json(
        { error: "Brand not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Neo4j error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}
